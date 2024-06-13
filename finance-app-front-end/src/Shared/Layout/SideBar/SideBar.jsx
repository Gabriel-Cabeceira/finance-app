import Button from "./Components/Button/Button";
import { SideConteiner, SideNav } from "./sidebar.styles";
import { GiPayMoney } from "react-icons/gi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsFillMenuAppFill } from "react-icons/bs";




const menuItems = [
    {
        id: '1',
        description: 'Movimentações',
        link: '/movimentacoes/despesas-fixas',
        icon: <GiPayMoney className="icon" />
    },
    {
        id: '2',
        description: 'Relatórios',
        link: '/relatorios',
        icon: <TbDeviceDesktopAnalytics className="icon"/>
    },
    {
        id: '3',
        description: 'Resumo',
        link: '/resumo', 
        icon: <BsFillMenuAppFill className="icon" />
    }
]


export default function SideBar() {
  return (
    <SideConteiner>
        <SideNav>
            <ul className="list">
                {
                    menuItems.map((item) => (
                        <li className="listItems" key={item.id} id={item.id}>
                            <Button link={item.link} description={item.description} icon={item.icon}/>
                        </li>
                    ))
                }
            </ul>
        </SideNav>
    </SideConteiner>
  )
}
