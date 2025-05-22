import { BookSchemaType, BookType } from "../../types/book.types";
import stripe from "./stripe";

export const createCheckoutSession = (book: BookSchemaType) => {
  const timestampInSeconds = Math.floor(Date.now() / 1000);
  const fiveMinFromNow = timestampInSeconds + 30 * 60;

  return stripe.checkout.sessions.create({
    // expires_at: fiveMinFromNow,
    payment_method_types: ["card", "amazon_pay"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title,
            images: [book.img],
            description: book.description,
          },
          unit_amount: book.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}?order-succeed=true`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });
};
