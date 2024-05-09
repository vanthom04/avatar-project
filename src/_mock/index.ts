interface TemplateType {
  id: number
  name: string
  image_url: string
}

interface MyAvatarType {
  id: number
  name: string
  thumbnail: string
  images: string
  options: object
  created_at: string
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

export const myavatar: MyAvatarType[] = [
  {
    id: 1,
    name: '',
    thumbnail: '',
    images: '',
    options: [{}],
    created_at: ''
  },
  {
    id: 2,
    name: '',
    thumbnail: '',
    images: '',
    options: [{}],
    created_at: ''
  },
  {
    id: 3,
    name: '',
    thumbnail: '',
    images: '',
    options: [{}],
    created_at: ''
  }
]
