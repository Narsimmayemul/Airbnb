import React, { useState, useEffect } from 'react';
import { Box, Card, CardBody, CardFooter, Image, HStack, IconButton } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import one from './img/one.jpg';
import two from './img/two.jpg';
import three from './img/three.jpg';
import four from './img/four.jpg';
import five from './img/five.jpg';
import a from './video/a.mp4';
import b from './video/b.mp4';
import c from './video/c.mp4';
import d from './video/d.mp4';
import e from './video/e.mp4';
import f from './video/f.mp4';
import g from './video/g.mp4';
import h from './video/h.mp4';

const Home = () => {
  const images = [one, two, three, four, five];
  const videos = [c, d, e,  g,a,b,h,f];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Card bg={'#fff8e9'}>
        <CardBody>
          <Box
            width="100%"
            height="500px"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                position="absolute"
                transition="opacity 1s ease-in-out"
                opacity={index === currentIndex ? 1 : 0}
              />
            ))}
          </Box>
        </CardBody>
        <CardFooter justifyContent={'center'}>
          <HStack justifyContent="center">
            {images.map((_, index) => (
              <IconButton
                key={index}
                icon={<FaCircle />}
                size="sm"
                color={currentIndex === index ? 'blue.500' : 'gray.400'}
                variant="unstyled"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </HStack>
        </CardFooter>
      </Card>
      {/* Card to Display Videos */}
      
      <Card mt={4}bg={'#fff8e9'}>
        <CardBody>
          <Box
            display="grid"
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={4}
          >
            {videos.map((video, index) => (
              <Box key={index} position="relative" overflow="hidden" borderRadius="lg">
                <video
                  src={video}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => e.target.pause()}
                  loop
                  muted
                />
              </Box>
            ))}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Home;
