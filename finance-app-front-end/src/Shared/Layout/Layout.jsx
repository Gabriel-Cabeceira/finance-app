import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { Main, FlexContainer } from "./layout.styles";


export default function Layout({ children }) {
  return (
    <Main>
      <SideBar />
      <FlexContainer>
        <Header />
        {children}
      </FlexContainer>
    </Main>
  )
}
