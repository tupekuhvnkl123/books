import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const { STRIPE_SECRET_KEY_TEST } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY_TEST!);

export default stripe;
