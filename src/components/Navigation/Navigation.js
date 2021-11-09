import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Nav, NavList, NavItem, } from './styles';

import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';

class Navigation extends React.Component { 
  handleCategoryClick = (e) => {
    const { history, changeCategory } = this.props;
    console.log(e.tagName)
    const targetName = e.target.tagName.toLowerCase();
    if (targetName !== 'li') {
      return;
    }
    const newCategory = e.target.id;
    if (newCategory === 'all') {
      history.push(`/`);
      changeCategory('all');
    } else {
      history.push(`/${newCategory}`);
      changeCategory(newCategory);
    }
  }
  render() {
    const { categories } = this.props;

    return (
      <Nav>
        <NavList onClick={this.handleCategoryClick}>
          {categories && categories.map((item) => {
            return <NavItem key={item} id={item}>{item[0].toUpperCase() + item.slice(1)}</NavItem>
          })}
        </NavList>
      </Nav>
    )
  }
}

const mapStateToProps = ({ category }) => ({
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));