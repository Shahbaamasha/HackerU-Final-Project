import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getAllUsers } from "../../store/user/userThunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";

const AllUsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>
      {users && users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Is Business</TableCell>
                <TableCell>Is Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {`${user.name.first} ${user.name.mid || ""} ${
                      user.name.last
                    }`}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {`${user.address.street} ${user.address.houseNumber}, ${user.address.city}, ${user.address.state}, ${user.address.country}`}
                  </TableCell>
                  <TableCell>{user.isBusiness ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="red" gutterBottom sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default AllUsersPage;
