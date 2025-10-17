import { getAds } from "@/lib/apis/ads.api";
import React from "react";
import AdsComponent from "./AdsComponent";

const Ads = async () => {
  const ads = await getAds();
  const adsData = ads && "data" in ads ? ads?.data : undefined;
  return <AdsComponent adsData={adsData || []} />;
};

export default Ads;
