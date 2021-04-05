import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, getAllUsers } from "../../../slices/userSlice";
import fetchStates from "../../../utils/fetchStates";

import { SubLayout as Layout } from "../../../components/Admin";
import {
  Table,
  Head,
  HeadCell,
  Row,
  Body,
  Cell,
} from "../../../components/Table";

const UserList = () => {
  const { token } = useSelector((state) => state.user.loginUser);
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector((state) => state.user.status);
  console.log("users:", users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === fetchStates.idle) {
      dispatch(getAllUsers(token));
    }
  }, [dispatch, token, userStatus]);

  return (
    <Layout pageTitle="User List">
      <Table>
        <Head>
          <Row>
            <HeadCell>#</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Email</HeadCell>
            <HeadCell>Sign Up At</HeadCell>
          </Row>
        </Head>
        <Body>
          {users.length === 0 ? (
            <Row>
              <Cell colSpan="4">No user.</Cell>
            </Row>
          ) : (
            users.map((user, index) => (
              <Row key={user.id}>
                <Cell>{index + 1}</Cell>
                <Cell>{user.name}</Cell>
                <Cell>{user.email}</Cell>
                <Cell>{new Date(user.createdAt).toLocaleString()}</Cell>
              </Row>
            ))
          )}
        </Body>
      </Table>
    </Layout>
  );
};

export default UserList;
