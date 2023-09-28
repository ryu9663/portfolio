import { Card, DragSlider } from 'junyeol-components';

const WhatIDid = () => {
  console.log('hi');
  return (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <DragSlider>
        {[
          {
            img: {
              url: 'https://webudding.com/_next/image/?url=https%3A%2F%2Fd29hudvzbgrxww.cloudfront.net%2Fpublic%2Fproduct%2F20220905144129-ee57741b-6057-4a1a-8531-8e6dcb6315f7.jpg&w=3840&q=100',
              alt: '아무거나',
            },
            onClick: () => console.log('hi'),
          },
          {
            img: {
              url: 'https://webudding.com/_next/image/?url=https%3A%2F%2Fd29hudvzbgrxww.cloudfront.net%2Fpublic%2Fproduct%2F20220905144129-ee57741b-6057-4a1a-8531-8e6dcb6315f7.jpg&w=3840&q=100',
              alt: '아무거나',
            },
            onClick: () => console.log('hi'),
          },
          {
            img: {
              url: 'https://webudding.com/_next/image/?url=https%3A%2F%2Fd29hudvzbgrxww.cloudfront.net%2Fpublic%2Fproduct%2F20220905144129-ee57741b-6057-4a1a-8531-8e6dcb6315f7.jpg&w=3840&q=100',
              alt: '아무거나',
            },
            onClick: () => console.log('hi'),
          },
          {
            img: {
              url: 'https://webudding.com/_next/image/?url=https%3A%2F%2Fd29hudvzbgrxww.cloudfront.net%2Fpublic%2Fproduct%2F20220905144129-ee57741b-6057-4a1a-8531-8e6dcb6315f7.jpg&w=3840&q=100',
              alt: '아무거나',
            },
            onClick: () => console.log('hi'),
          },
        ].map(({ img, onClick }, i) => (
          <Card
            key={i}
            img={img}
            description={{ fontSize: 'small', content: '하이하이' }}
            onClick={onClick}
            boxShadow={false}
          />
        ))}
      </DragSlider>
    </div>
  );
};

export default WhatIDid;
