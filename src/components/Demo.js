import React, { Component } from "react";
import Layout from "./Layout";
import { connect } from "react-redux";
import { ADD_5, MUL_5, STORE_RES, DEL_RES,storeRes } from "./../store/actions/type";
class Demo extends Component {
  render() {
    const ctr = this.props.ctr.counter;
    return (
      <Layout>
        <h2>{ctr}</h2>

        <button onClick={this.props.add5}>Add 5</button>

        <button onClick={this.props.mul5}>Multiply 5</button>

        <button onClick={() => this.props.store(ctr)}>Store</button>

        <ul>
          {this.props.res.results.map((r) => {
            return (
              <li onClick={() => this.props.del(r.id)} key={r.id}>
                {r.val}
              </li>
            );
          })}
        </ul>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  /*
    ctr: {counter: 0}
    res: {results: Array(0)}
    */
  return {
    ctr: state.ctr,
    res: state.res,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add5: () => dispatch({ type: ADD_5 }),
    mul5: () => dispatch({ type: MUL_5 }),
    // store: (val) =>
      // dispatch({ type: STORE_RES, data: { val, id: Math.random() } }),

    //async action creator which calls sync action to take over
    store: (val) => dispatch(storeRes(val)),
    del: (val) => dispatch({ type: DEL_RES, data: { val } }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
