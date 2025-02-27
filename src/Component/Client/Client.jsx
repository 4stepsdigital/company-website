import Image from "next/image";
import React from "react";
const Client = () => {
  const cards = [
    {
      images: "/image/con.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/con.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Rescom Solar",
    },
    {
      images: "/image/con.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/con.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/ele.jpg",
      alt: "Electrical Junction",
    },
    {
      images: "/image/con.jpg",
      alt: "Electrical Junction",
    },
  ];

  return (
    <div className=" bg-background">
      <div className="container-wrapper  py-10 md:py-0  md:px-0 px-2">
        <div className=" grid md:grid-cols-2 place-items-center justify-center items-center md:gap-0 gap-8">
          <div className="flex-col animate-slide-in-left">
            <p className="text-[12px] text-zinc-900 leading-3 font-bold uppercase">
              Clients
            </p>
            <h2 className="md:py-3 py-2 text-heading text-xl md:text-3xl font-semibold capitalize">
              The confidence of our clients
            </h2>
            <p className="md:text-[15px] text-xs leading-6">
              Over the course of the past three years, we have had the privilege
              of collaborating with a diverse array of over 75 clients, each
              contributing to our rich tapestry of experience and expertise.
              Among these valued partnerships, several hold special significance
              due to their impact on our growth and shared success. As a
              testament to these pivotal collaborations, we proudly showcase the
              logos of these esteemed clients on our website.
            </p>
          </div>
          <div className="grid md:py-10 py-0 grid-cols-3 md:grid-cols-4 gap-5 place-items-center md:w-2/3 w-full animate-slide-in-from-right">
            {cards?.map((card, i) => (
              <div
                key={i}
                className="w-full bg-white shadow-lg overflow-hidden border rounded-md grid place-items-center p-2"
              >
                <Image
                  className="w-full h-full object-cover"
                  src={card?.images}
                  alt={card?.alt}
                  height={100}
                  width={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
