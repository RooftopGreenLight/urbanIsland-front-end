import { atom, selector } from "recoil"

export const applyRoofTopState = atom({
  key: "applyInfo",
  dangerouslyAllowMutability: true,
  default: {
    base: {
      width: 0,
      totalPrice: 0,
      phoneNumber: "",
    },
    content: {
      explainContent: "",
      refundContent: "",
      roleContent: "",
      ownerContent: "",
    },
    time: {
      startTime: 0,
      endTime: 23,
    },
    person: {
      adultCount: 0,
      kidCount: 0,
      petCount: 0,
      totalCount: 0,
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

export const applyRoofTopPerson = selector({
  key: "applyInfo/Person",
  get: ({ get }) => {
    const { person } = get(applyRoofTopState)
    return person
  },
  set: ({ set }, newValue) => {
    set(applyRoofTopState, prevState => {
      return { ...prevState, person: newValue }
    })
  },
})

export const applyRoofTopFacilities = selector({
  key: "applyInfo/Facilities",
  get: ({ get }) => {
    const { detailNum } = get(applyRoofTopState)
    return detailNum
  },
  set: ({ set }, newValue) => {
    set(applyRoofTopState, prevState => {
      return { ...prevState, detailNum: newValue }
    })
  },
})

export const applyRoofTopContent = selector({
  key: "applyInfo/Content",
  get: ({ get }) => {
    const { content } = get(applyRoofTopState)
    return content
  },
  set: ({ set }, newValue) => {
    const { name, value } = newValue
    set(applyRoofTopState, prevState => {
      return { ...prevState, content: { ...prevState.content, [name]: value } }
    })
  },
})

export const applyRoofTopTime = selector({
  key: "applyInfo/Time",
  get: ({ get }) => {
    const { time } = get(applyRoofTopState)
    return time
  },
  set: ({ set }, newValue) => {
    set(applyRoofTopState, prevState => {
      return { ...prevState, time: newValue }
    })
  },
})

export const applyRoofTopBase = selector({
  key: "applyInfo/Base",
  get: ({ get }) => {
    const { base } = get(applyRoofTopState)
    return base
  },
  set: ({ set }, newValue) => {
    const { name, value } = newValue
    set(applyRoofTopState, prevState => {
      return { ...prevState, base: { ...prevState.base, [name]: value } }
    })
  },
})
