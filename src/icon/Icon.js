import React from 'react';
import {
  FaRegEdit,
} from 'react-icons/fa';
import {
  FiEdit,
  FiLogIn,
  FiLogOut,
} from 'react-icons/fi';
import {
  GoTrashcan
} from 'react-icons/go';
import {
  MdClear,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdMenu,
  MdMoreHoriz,
  MdPerson,
} from 'react-icons/md';

const Icons = {
  edit: FaRegEdit,
  write: FiEdit,
  signIn: FiLogIn,
  signOut: FiLogOut,
  remove: GoTrashcan,
  close: MdClear,
  arrowDown: MdKeyboardArrowDown,
  arrowUp: MdKeyboardArrowUp,
  back: MdKeyboardArrowLeft,
  menu: MdMenu,
  more: MdMoreHoriz,
  user: MdPerson,
};

class Icon extends React.Component {
  render() {
    const { name } = this.props;
    const Component = Icons[name];

    return <Component {...this.props} />
  }
}

export default Icon;
