import React from 'react';

const Card = ({ imageUrl, title, prof, tel }) => {
  return (
    <div className="max-w-sm w-1/3 border border-black rounded overflow-hidden shadow-lg">
      <img className="mx-auto h-[40%] w-[90%] object-contain mt-2 p-2 rounded-[20px]" src={imageUrl} alt={title} />
      <div className="px-6 gap-6 py-4">
        <div className="font-bold font-Poppins text-xl mt-4 mb-2 text-[#696984]">{title}</div>
        <p className="text-gray-700 mb-4 mt-4 font-Poppins">Professeur: {prof}</p>
        <p className="text-gray-700 font-Poppins">Num de telephone: {tel}</p>
      </div>
    </div>
  );
};

const Dawarat = () => {
  // Example data
  const data = [
    {
      title: 'Dawra Maths',
      prof: 'Daoud Sekki',
      tel: '0555555555',
      imageUrl: '../Sekki.jpg',
    },
    {
        title: 'Dawra Maths',
        prof: 'Daoud Sekki',
        tel: '0555555555',
        imageUrl: '../Sekki.jpg',
    },
    {
        title: 'Dawra Maths',
        prof: 'Daoud Sekki',
        tel: '0555555555',
        imageUrl: '../Sekki.jpg',
    },
    {
        title: 'Dawra Maths',
        prof: 'Daoud Sekki',
        tel: '0555555555',
        imageUrl: '../Sekki.jpg',},
      {
        title: 'Dawra Maths',
        prof: 'Daoud Sekki',
        tel: '0555555555',
        imageUrl: '../Sekki.jpg',
      },
      {
        title: 'Dawra Maths',
        prof: 'Daoud Sekki',
        tel: '0555555555',
        imageUrl: '../Sekki.jpg',
      },
    // Add more data as needed
  ];

  return (
    <div>
         <div className='flex '>
            <img src='./Group 2215.svg' className='h-32 w-32 hover:cursor-pointer p-6'></img>
        </div>
        <div className='text-center'>
            <h1 className='font-Poppins font-bold text-5xl mb-20 text-[#F48C06]'>Dawarat li kaynin</h1>
        </div>
    <div className="w-[80%] gap-4 mx-auto flex flex-wrap">
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
    </div>
  );
};

export default Dawarat;