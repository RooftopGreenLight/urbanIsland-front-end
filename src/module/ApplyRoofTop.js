import { atom, selector } from "recoil"

export const applyRoofTopState = atom({
  key: "applyInfo",
  dangerouslyAllowMutability: true,
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

export const applyRoofTopImg = selector({
  key: "applyInfo/Img",
  get: ({ get }) => {
    const { img } = get(applyRoofTopState)
    return img
  },
  set: ({ set }, newValue) => {
    const { name, value } = newValue
    set(applyRoofTopState, prevState => {
      return { ...prevState, img: { ...prevState.img, [name]: value } }
    })
  },
})
