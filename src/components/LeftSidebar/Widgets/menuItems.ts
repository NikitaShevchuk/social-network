import {faComment, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import {faComment as farComment, faUser as farUser} from "@fortawesome/free-regular-svg-icons";
import farHouse from '../../../common/assets/img/icons/home-regular-icon.svg'

interface MenuItem {
    name: string,
    link: string,
    icon: any
}
export const getMenuItems = (location: string): MenuItem[] => ([
    {
        name: 'Home',
        link: '',
        icon: location === '/' ? faHouse : farHouse
    },
    {
        name: 'Messages',
        link: '/messages',
        icon: location.includes('/messages') ? faComment : farComment
    },
    {
        name: 'My profile',
        link: '/profile',
        icon: location === '/profile' ? faUser : farUser
    },
])