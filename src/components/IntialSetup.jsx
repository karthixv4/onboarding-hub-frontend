import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Divider,
} from "@nextui-org/react";

const InitialSetup = () => {
  const cardData = [
    { title: "Shooting Stars", description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche." },
    { title: "The Catalyzer", description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche." },
    { title: "Neptune", description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche." },
 ];

  return (
    <div className="py-12 px-5 mx-auto text-center">
      <div className="mb-20">
        <h1 className="text-3xl font-semibold mb-4">Master Cleanse Reliac Heirloom</h1>
        <p className="lg:w-2/3 mx-auto text-base leading-relaxed text-gray-700">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
      </div>
      
      <div className="flex flex-wrap justify-center">
        {cardData.map((card, index) => (
          <Card key={index} className="m-4 w-full sm:w-1/2 lg:w-1/4">
            <CardHeader className="text-lg font-medium">{card.title}</CardHeader>
            <Divider />
            <CardBody>
              <p className="leading-relaxed text-base mb-4">{card.description}</p>
              <Button variant="flat" color="primary" className="inline-flex items-center">
                Learn More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Button className="mt-16 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-lg">Button</Button>
    </div>
  );
};

export default InitialSetup;
