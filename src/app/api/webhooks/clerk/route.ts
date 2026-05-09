import { headers } from "next/headers";
import { Webhook } from "svix";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook verification failed", err);

    return new Response("Error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, image_url } = evt.data;

    await prisma.user.create({
      data: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: first_name,
        imageUrl: image_url,
      },
    });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, image_url } = evt.data;

    await prisma.user.update({
      where: {
        clerkId: id,
      },
      data: {
        email: email_addresses[0].email_address,
        name: first_name,
        imageUrl: image_url,
      },
    });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    await prisma.user.delete({
      where: {
        clerkId: id,
      },
    });
  }

  return new Response("Webhook received", {
    status: 200,
  });
}
