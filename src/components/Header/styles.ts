import styled from 'styled-components'
// const height = window.innerHeight.toString()

export const Container = styled.header`
position:fixed;
left:0;
top:0;
width:100%;
height:auto;
z-index:1000;
background-color: ${({theme}) => theme.colors.secondary};
/* Top Nav Bar
It needs to implemensts adaptative layout
*/
.topNavbar{
    display:none;
}
@media screen and (min-width:1024px){
    .topNavbar{
        display:flex;
        flex-direction:row;
        justify-content:center;
        width:100%;
        padding:0 100px;
    }
    .contactsContainer{
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:relative;
        width:100%;
        max-width:1120px;
    }
    .socialMedia{
        float:left;
    }
    .socialMedia ul{
        margin:0;
        padding:0;
        display:flex;
    }
    .socialMedia ul li{
        display:flex;
        position:relative;
        align-items:center;
    }
    .socialMedia ul li a{
        line-height:24px;
        padding:8px 8px;
        font-size:24px;
        display:flex;
        transition:all .3s ease-out;
        align-items:center;
        text-align:center;
    }
    .mainContacts{
        float:left;
    }
    .mainContacts ul{
        margin:0;
        padding:0;
        display:flex;
    }
    .mainContacts ul li{
        display:flex;
        position:relative;
        align-items:center;
    }
    .mainContacts ul li a{
        line-height:24px;
        padding:8px 24px;
        display:flex;
        transition:all .3s ease-out;
        align-items:center;
        text-align:center;
    }
}
`
/*
Bottom Nav Bar
*/
export const BottomNavBar = styled.div`
    display:flex;
    justify-content:center;
    position:absolute;
    width:100%;
    background: linear-gradient(180deg, ${({theme})=>theme.colors.secondary} 0%, ${({theme})=>theme.colors.secondary} 100%);
    z-index:100;
    @media screen and (min-width:1024px){
        display:flex;
        justify-content:center;
        position:absolute;
        top:40px;
        left:0;
        width:100%;
        padding:0 100px;
    }
`
export const NavContainer = styled.div`
    @media (max-width: 1024px) {
        top:0;
        left:0;
        width:100%;
        box-sizing:border-box;
        padding:0 20px;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        height:60px;
        .logoPlaceHolder{
            color:#fff;
            height:50px;
            float:left;
            a {
              display: flex;
              align-items: center;
              svg {
                height:50px;
                padding:8px;
                g path {
                  fill:#243e92;
                }
              }
            }
        }
        .menuIcon{
            color:${({theme})=>theme.colors.gray_1000};
            float:right;
            line-height:30px;
            font-size:30px;
            cursor:pointer;
            display:block;
        }
        nav{
            position:absolute;
            width:100%;
            min-height:calc(100vh - 50px);
            height: auto;
            background:${({theme})=>theme.colors.secondary};
            top:60px;
            left:-100%;
            transition: 0.2s ease-out;
        }
        nav.showMenu{
            left:0;
        }
        nav ul{
            display:block;
            text-align:center;
            width:100%;
        }
        nav .menuItem{
            width:100%;
            display:flex;
            flex-direction:column;
            position:relative;
            cursor: pointer;
        }
        nav .menuItem a{
            height:50px;
            line-height:60px;
            padding:0 24px;
            width:100%;
            transition:all 0.2s ease-out;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }
        nav .menuItem a svg{
            height:16px;
            width:auto;
            padding:0 0 0 8px ;
        }
        nav .menuItem a:hover{
            border-bottom:1px solid ${({theme})=>theme.colors.gray_1000};
            background:${({theme})=>theme.colors.primary};
        }
        nav .menuItem a.active{
            cursor:default;
            border-bottom:1px solid ${({theme})=>theme.colors.gray_1000};
            background:${({theme})=>theme.colors.primary};
            width:100%;
        }
    }
    @media screen and (min-width:1024px){
        top:0;
        left:0;
        width:100%;
        max-width:1120px;
        box-sizing:border-box;
        .logoPlaceHolder{
            color:#fff;
            height:50px;
            float:left;
            a {
              display: flex;
              align-items: center;
              svg {
                height:50px;
                padding:8px;
                g path {
                  fill:#243e92;
                }
              }
            }
        }
        .menuIcon{
            color:${({theme})=>theme.colors.gray_1000};
            float:right;
            line-height:40px;
            font-size:40px;
            cursor:pointer;
            display:none;
        }
        nav{
            float:right;
        }
        nav ul{
            margin:0;
            padding:0;
            display:flex;
        }
        nav .menuItem{
            display:flex;
            position:relative;
            align-items:center;
            cursor: pointer;
        }
        nav .menuItem a{
            height:60px;
            line-height:60px;
            padding:0 24px;
            display:flex;
            transition:all .3s ease-out;
            align-items:center;
            text-align:center;
            cursor: pointer;
        }

        nav .menuItem a:hover{
            border-bottom:2px solid ${({theme})=>theme.colors.gray_1000};
            background:${({theme})=>theme.colors.blue_primary};
        }
        nav .menuItem a.active{
            cursor:default;
            border-bottom:3px solid ${({theme})=>theme.colors.gray_1000};
        }
        nav .menuItem a.active:hover{
            cursor:default;
            background:transparent;
            border-bottom:3px solid ${({theme})=>theme.colors.gray_1000};
        }
    }
`

