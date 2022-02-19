import React, { ReactElement } from "react";

import { TABS } from "../../App";

import styles from "./content.module.css";

import {
  HomePage,
  FirstTask,
  SecondTask,
  ThirdTask,
  FourthTask,
  FifthTask,
  SixthTask,
} from "./Tabs";

type TContentProps = {
  activeTab: string;
};

export default function Content(props: TContentProps): ReactElement {
  let ContentComponent: React.FunctionComponent;

  switch (props.activeTab) {
    case TABS.HOMEPAGE: {
      ContentComponent = HomePage;
      break;
    }
    case TABS.FIRST_TASK: {
      ContentComponent = FirstTask;
      break;
    }
    case TABS.SECOND_TASK: {
      ContentComponent = SecondTask;
      break;
    }
    case TABS.THIRD_TASK: {
      ContentComponent = ThirdTask;
      break;
    }
    case TABS.FOURTH_TASK: {
      ContentComponent = FourthTask;
      break;
    }
    case TABS.FIFTH_TASK: {
      ContentComponent = FifthTask;
      break;
    }
    case TABS.SIXTH_TASK: {
      ContentComponent = SixthTask;
      break;
    }
    default:
      ContentComponent = HomePage;
      break;
  }

  return (
    <div className={styles["content"]}>
      <ContentComponent />
    </div>
  );
}
