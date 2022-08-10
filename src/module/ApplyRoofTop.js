import { atom } from "recoil"

export const applyRoofTopContent = atom({
  key: "applyRoofTopInfo/Content",
  default: {
    explainContent: "",
    refundContent: "",
    roleContent: "",
    ownerContent: "",
  },
})

export const applyRoofTopTime = atom({
  key: "applyRoofTopInfo/Time",
  default: {
    startTime: 0,
    endTime: 23,
  },
})

export const applyRoofTopPerson = atom({
  key: "applyRoofTopInfo/Person",
  default: {
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
  },
})

export const applyRoofTopPrice = atom({
  key: "applyRoofTopInfo/Price",
  default: {
    totalPrice: 0,
    widthPrice: 0,
  },
})

export const applyRoofTopInfo = atom({
  key: "applyRoofTopInfo",
  default: {
    width: 0,
    content: {
      explainContent: "",
      refundContent: "",
      roleContent: "",
      ownerContent: "",
    },
    time: {
      startTime: "",
      endTime: "",
    },
    person: {
      adultCount: 0,
      kidCount: 0,
      petCount: 0,
      totalCount: 0,
    },
    price: {
      totalPrice: 0,
      widthPrice: 0,
    },
    location: {
      country: "",
      city: "",
      detail: "",
    },
    detailNum: [],
    img: {
      normalFile: [],
      structFile: "",
    },
    option: {
      optionCount: 0,
      optionContent: [],
      optionPrice: [],
    },
  },
})
