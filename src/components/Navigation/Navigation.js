import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Nav, NavList, NavItem, } from './styles';

import { ACTION_CHANGE_CATEGORY } from '../../ducks/category';

class Navigation extends React.Component { 
  handleCategoryClick = (e) => {
    /* listens for click event and change PLP category using ACTION_CHANGE_CATEGORY */
    const { history, changeCategory, isOverlayOpen } = this.props;
    const targetName = e.target.tagName.toLowerCase();
    const newCategory = e.target.id;

    if (isOverlayOpen) return;
    
    if (targetName !== 'li') return;
    
    if (newCategory === 'all') {
      history.push(`/`);
      changeCategory('all');
    } else {
      history.push(`/${newCategory}`);
      changeCategory(newCategory);
    } 
    document.title = `${newCategory[0].toUpperCase() + newCategory.slice(1)}`;
  }

  render() {
    const { categories, category } = this.props;

    return (
      <Nav>
        <NavList onClick={this.handleCategoryClick}>
          {categories && categories.map((item) => {
            return (
              <NavItem key={item} color={(category && category === item) ? '#5ECE7B' : '#1D1F22' } id={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </NavItem>
              )
          })}
        </NavList>
      </Nav>
    )
  }
}

const mapStateToProps = ({ category, isOverlayOpen }) => ({
  categories: category.categories,
  category: category.category,
  isOverlayOpen: isOverlayOpen.isOverlayOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (value) => dispatch(ACTION_CHANGE_CATEGORY(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));