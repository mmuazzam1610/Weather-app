import { AppLayout } from "@components/shared";
import { Condition } from "@components/Weather";
import { Forecast } from "@components/Weather/Forecast";
import { conditionTypes } from "@types";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps as ServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, Key, useEffect, useState } from "react";

const Weather: FC<{ data: any }> = ({ data }) => {
  const [imageURL, setImageURL] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=32468937-ef788039e3d2e562ede99a239&orientaion=horizontal&safesearch=true&per_page=3&image_type=photo&q=${data.current.condition.text
          .trim()
          .toLowerCase()
          .replaceAll(" ", "+")}`
      )
      .then((res) => {
        setImageURL(res.data.hits[0].largeImageURL);
      });
  }, []);
  return (
    <AppLayout
      style={
        imageURL
          ? { backgroundImage: `url(${imageURL})`, backgroundSize: "cover" }
          : {}
      }
    >
      <div className="w-screen h-screen bg-black/25">
        <div className="flex flex-col min-h-screen gap-24 content-between">
          <div className="flex flex-row px-8 pt-8 justify-between">
            <div className="flex flex-col gap-4">
              <Image
                src={`http:${data.current.condition.icon}`}
                alt="condition-icon"
                width={64}
                height={64}
              />
              <span className="text-3xl">{data.current.condition.text}</span>
              <span>
                {data.location.region}, {data.location.country}
              </span>
              <span className="text-4xl font-bold">
                {data.current.temp_c}&deg; C
              </span>
              <div
                className="text-xl flex flex-row gap-4 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/location.png"
                  height={32}
                  width={32}
                  alt="location"
                />
                Change Location
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Condition
                title="Humidity"
                icon={conditionTypes.humidity}
                detail={`${data.current.humidity} %`}
              />
              <Condition
                title="Air Pressure"
                icon={conditionTypes.air}
                detail={`${data.current.pressure_mb} mb`}
              />
              <Condition
                title="Precipitaion"
                icon={conditionTypes.rain}
                detail={`${data.current.precip_mm} mm`}
              />
              <Condition
                title="Wind"
                icon={conditionTypes.wind}
                detail={`${data.current.wind_kph} kph - ${data.current.wind_dir}`}
              />
            </div>
          </div>
          <div className="flex flex-row absolute bottom-4 px-4 gap-10">
            {data.forecast.forecastday.map((val: any, index: number) => (
              <Forecast key={index} data={val} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: ServerSideProps = async ({ params }) => {
  let res: AxiosResponse;
  const query = params?.query;
  let day = new Date();
  day.setDate(day.getDate() + 7);

  try {
    res = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=d9e3a621141d4b7b88a132726223012&q=${query}&days=7&dt=${day.getUTCFullYear()}-${day.getUTCMonth()}-${day.getUTCDate()}`
    );
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: res.data },
  };
};

export default Weather;
