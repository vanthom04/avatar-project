interface TemplateType {
  id: number
  name: string
  image_url: string
}

interface Categories {
  id: string
  name: string
  options: {
    name: string
    value: string
  }[]
}

export const templates: TemplateType[] = [
  {
    id: 1,
    name: 'Character 1',
    image_url:
      'https://avatar.canawan.com/image/?image=https://cdn-files.canawan.com/my-styles/characters/character-1.png'
  },
  {
    id: 2,
    name: 'Character 2',
    image_url:
      'https://avatar.canawan.com/image/?image=https://cdn-files.canawan.com/my-styles/characters/character-2.png'
  },
  {
    id: 3,
    name: 'Character 3',
    image_url:
      'https://avatar.canawan.com/image/?image=https://cdn-files.canawan.com/my-styles/characters/character-3.png'
  },
  {
    id: 4,
    name: 'Character 4',
    image_url:
      'https://avatar.canawan.com/image/?image=https://cdn-files.canawan.com/my-styles/characters/character-4.png'
  }
]

export const dataOptions: Categories[] = [
  {
    name: 'shirt',
    id: 'shirt',
    options: [
      {
        name: 'shirt-1',
        value: '/assets/images/shirt/shirt-1.png'
      },
      {
        name: 'shirt-2',
        value: '/assets/images/shirt/shirt-2.png'
      },
      {
        name: 'shirt-3',
        value: '/assets/images/shirt/shirt-3.png'
      },
      {
        name: 'shirt-4',
        value: '/assets/images/shirt/shirt-4.png'
      }
    ]
  },
  {
    name: 'eyes',
    id: 'eyes',
    options: [
      {
        name: 'eyes-1',
        value: '/assets/images/eyes/eyes-1.png'
      },
      {
        name: 'eyes-2',
        value: '/assets/images/eyes/eyes-2.png'
      },
      {
        name: 'eyes-3',
        value: '/assets/images/eyes/eyes-3.png'
      },
      {
        name: 'eyes-4',
        value: '/assets/images/eyes/eyes-4.png'
      },
      {
        name: 'eyes-5',
        value: '/assets/images/eyes/eyes-5.png'
      },
      {
        name: 'eyes-6',
        value: '/assets/images/eyes/eyes-6.png'
      },
      {
        name: 'eyes-7',
        value: '/assets/images/eyes/eyes-7.png'
      },
      {
        name: 'eyes-8',
        value: '/assets/images/eyes/eyes-8.png'
      },
      {
        name: 'eyes-9',
        value: '/assets/images/eyes/eyes-9.png'
      }
    ]
  },
  {
    name: 'mouth',
    id: 'mouth',
    options: [
      {
        name: 'mouth-1',
        value: '/assets/images/mouth/mouth-1.png'
      },
      {
        name: 'mouth-2',
        value: '/assets/images/mouth/mouth-2.png'
      },
      {
        name: 'mouth-3',
        value: '/assets/images/mouth/mouth-3.png'
      },
      {
        name: 'mouth-4',
        value: '/assets/images/mouth/mouth-4.png'
      },
      {
        name: 'mouth-5',
        value: '/assets/images/mouth/mouth-5.png'
      },
      {
        name: 'mouth-6',
        value: '/assets/images/mouth/mouth-6.png'
      },
      {
        name: 'mouth-7',
        value: '/assets/images/mouth/mouth-7.png'
      },
      {
        name: 'mouth-8',
        value: '/assets/images/mouth/mouth-8.png'
      }
    ]
  },
  {
    name: 'accessory',
    id: 'accessory',
    options: [
      {
        name: 'accessory-1',
        value: '/assets/images/accessory/accessory-1.png'
      },
      {
        name: 'accessory-2',
        value: '/assets/images/accessory/accessory-2.png'
      },
      {
        name: 'accessory-3',
        value: '/assets/images/accessory/accessory-3.png'
      },
      {
        name: 'accessory-4',
        value: '/assets/images/accessory/accessory-4.png'
      },
      {
        name: 'accessory-5',
        value: '/assets/images/accessory/accessory-5.png'
      },
      {
        name: 'accessory-6',
        value: '/assets/images/accessory/accessory-6.png'
      }
    ]
  },
  {
    name: 'hair',
    id: 'hair',
    options: [
      {
        name: 'hair-1',
        value: '/assets/images/hair/hair-1.png'
      },
      {
        name: 'hair-2',
        value: '/assets/images/hair/hair-2.png'
      },
      {
        name: 'hair-3',
        value: '/assets/images/hair/hair-3.png'
      },
      {
        name: 'hair-4',
        value: '/assets/images/hair/hair-4.png'
      },
      {
        name: 'hair-5',
        value: '/assets/images/hair/hair-5.png'
      },
      {
        name: 'hair-6',
        value: '/assets/images/hair/hair-6.png'
      },
      {
        name: 'hair-7',
        value: '/assets/images/hair/hair-7.png'
      },
      {
        name: 'hair-8',
        value: '/assets/images/hair/hair-8.png'
      }
    ]
  },
  {
    name: 'hand',
    id: 'hand',
    options: [
      {
        name: 'hand-1',
        value: '/assets/images/hand/hand-1.png'
      },
      {
        name: 'hand-2',
        value: '/assets/images/hand/hand-2.png'
      },
      {
        name: 'hand-3',
        value: '/assets/images/hand/hand-3.png'
      },
      {
        name: 'hand-4',
        value: '/assets/images/hand/hand-4.png'
      }
    ]
  }
]

export const images = [
  {
    src: './images/hair/hair-1.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  },
  {
    src: './images/eyes/eyes-2.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  },
  {
    src: './images/mouth/mouth-2.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  },
  {
    src: './images/accessory/accessory-2.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  },
  {
    src: './images/hand/hand-2.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  },
  {
    src: './images/body/body.png',
    x: 0,
    y: 0,
    width: 4000,
    height: 4000
  }
]
