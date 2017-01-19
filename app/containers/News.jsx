// @flow
import { connect } from 'react-redux';

import ContentList from '../components/ContentList';


function mapStateToProps(state) {
  return {
    list: state.get('news'),
  };
}

export default connect(mapStateToProps)(ContentList);
