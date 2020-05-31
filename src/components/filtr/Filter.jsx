import React from "react";
import { connect } from "react-redux";
import * as phoneActions from "../../redux/phoneActions";
import PropTypes from "prop-types";
import style from "./filter.module.css";

const Filter = ({ contacts, filter, onChangeFilter }) => {
  return (
    contacts.length > 0 && (
      <div>
        <h2>Contacts</h2>
        <label htmlFor="findForm" className={style.labelStyle}>
          Find contacts by name
          <br />
          <input
            type="text"
            value={filter}
            onChange={onChangeFilter}
            id="findForm"
          />
        </label>
      </div>
    )
  );
};

// class Filter extends Component {
//   render() {
//     return (
//       this.props.contacts.length > 0 && (
//         <div>
//           <h2>Contacts</h2>
//           <label htmlFor="findForm" className={style.labelStyle}>
//             Find contacts by name
//             <br />
//             <input
//               type="text"
//               value={this.props.filter}
//               onChange={this.props.onChangeFilter}
//               id="findForm"
//             />
//           </label>
//         </div>
//       )
//     );
//   }
// }
Filter.protoTypes = {
  onFindContact: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
  filter: state.filter,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (ev) => dispatch(phoneActions.changeFilter(ev.target.value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
