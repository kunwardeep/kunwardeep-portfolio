import SnakeGame from ".";
import AppContainer from "../portfolio/components/AppContainer";

const Page = () => {
  return (
    <AppContainer showBreadCrumbs>
      <SnakeGame />
    </AppContainer>
  );
};

export default Page;
