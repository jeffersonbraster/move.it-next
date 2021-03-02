import { CompletedChallenges } from "../components/CompletedChanllenges";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Countdown } from "../components/Countdown";
import { ExpBar } from "../components/ExpBar";
import { Profile } from "../components/Profile";

import style from "../styles/Home.module.css";
import { ChallengerBox } from "../components/ChallengerBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChanllengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  chanllengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChanllengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      chanllengesCompleted={props.chanllengesCompleted}
    >
      <div className={style.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>

        <ExpBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengerBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChanllengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, chanllengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      chanllengesCompleted: Number(chanllengesCompleted),
    },
  };
};
