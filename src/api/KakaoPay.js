import axios from "axios"

export const KakaoPayControl = {
  postRequestToPay: async (rooftopId, total_amount, item_name) => {
    let response
    try {
      response = await axios({
        baseURL: process.env.REACT_APP_KAKAO_PAY_HOST_URL,
        url: "/v1/payment/ready",
        method: "POST",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          item_name,
          quantity: 1,
          total_amount,
          vat_amount: 0,
          tax_free_amount: 0,
          approval_url: `http://localhost:3000/reservation/payment/${rooftopId}/success`,
          fail_url: `http://localhost:3000/reservation/payment/${rooftopId}/fail`,
          cancel_url: `http://localhost:3000/reservation/payment/${rooftopId}/fail`,
        },
      })
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  },
  postApprovePayment: async (tid, pg_token) => {
    let response
    try {
      response = await axios({
        baseURL: process.env.REACT_APP_KAKAO_PAY_HOST_URL,
        url: "/v1/payment/approve",
        method: "POST",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          cid: "TC0ONETIME",
          tid,
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          pg_token,
        },
      })
      return response.data
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  },
}
