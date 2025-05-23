import { BookSchemaType } from "../../types/book.types";
import stripe from "./stripe";

export const createCheckoutSession = (book: BookSchemaType) => {
  return stripe.checkout.sessions.create({
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
