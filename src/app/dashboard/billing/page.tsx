import BillingForm from "@/components/BillingForm";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <BillingForm subscriptionPlan={subscriptionPlan} userId={user?.id} />;
};

export default Page;
