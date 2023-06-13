export const newArtist = {
  firstname: 'Leonardo',
  lastname: 'Da vinci',
  avatar: 'avatar.jpeg',
  bio: 'Lorem Ipsum,',
  birthdate: new Date('1475/6/3 GMT'),
  movement: 'Pop Art',
  gender: 'Male',
  nationality: 'Italian',
  death: '1564/02/18',
  price: 2000,
};

export const newMovement = {
  name: 'Pop Art',
  description:
    'The pop art, spanning from the 14th to the 16th century, was a period of cultural and intellectual rebirth in Europe. It was characterized by a revival of interest in classical art, literature, and learning, as well as a shift towards a more humanistic worldview. Artists such as Leonardo da Vinci, Michelangelo, and Raphael created iconic works that showcased technical skill, perspective, and a deeper understanding of the human form. The Renaissance also witnessed advancements in science, with figures like Copernicus and Galileo challenging prevailing beliefs. The period was marked by the spread of ideas through the printing press, leading to the democratization of knowledge. The legacy of the Renaissance can be seen in its lasting impact on art, literature, philosophy, and the development of a more individualistic and human-centered approach to the world.',
  country: 'Cuba',
  localization: [42.8333, 12.8333],
  activity: ['XIV', 'XVI'],
};

export const newArtwork = {
  name: 'My art',
  author: 'Leonardo',
  country: 'Italy',
  localization: [41.903056, 12.454444],
  technique: 'Fresco',
  movement: 'Pop Art',
  description: `"My art" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
  year: '1512',
  price: 9000,
};

export const expectedResponseKeys = ['id', 'name', 'items'];

export const expectedItemKeys = [
  'id',
  'name',
  'description',
  'year',
  'localization',
  'technique',
  'price',
  'movement',
  'artist',
];

export const arrayOfNewItems = [
  {
    newArtist: {
      firstname: 'Pablo',
      lastname: 'Picasso',
      avatar: 'avatar.jpeg',
      bio: 'Lorem Ipsum sicmunt,',
      birthdate: new Date('1881/10/25 GMT'),
      movement: 'Cubism',
      gender: 'Male',
      nationality: 'Spanish',
      death: '1973/08/4',
      price: 1000,
    },

    newMovement: {
      name: 'Cubism',
      description:
        'The Cubism, spanning from the 14th to the 16th century, was a period of cultural and intellectual rebirth in Europe. It was characterized by a revival of interest in classical art, literature, and learning, as well as a shift towards a more humanistic worldview. Artists such as Leonardo da Vinci, Michelangelo, and Raphael created iconic works that showcased technical skill, perspective, and a deeper understanding of the human form. The Renaissance also witnessed advancements in science, with figures like Copernicus and Galileo challenging prevailing beliefs. The period was marked by the spread of ideas through the printing press, leading to the democratization of knowledge. The legacy of the Renaissance can be seen in its lasting impact on art, literature, philosophy, and the development of a more individualistic and human-centered approach to the world.',
      country: 'France',
      localization: [52.9776, 56.4504],
      activity: ['1907', '1914'],
    },

    newArtwork: {
      name: `Les Demoiselles d'Avignon`,
      author: 'Pablo',
      country: 'Spain',
      localization: [40.7016, -73.9776],
      technique: 'Oil on Canvas',
      movement: 'Cubism',
      description: `"this" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
      year: '1907',
      price: 8000,
    },
  },
];
