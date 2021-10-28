import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ReferInterface } from "../models/IRefer";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Refers() {
  const classes = useStyles();
  const [refers, setRefers] = useState<ReferInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const getRefers = async () => {
    fetch(`${apiUrl}/refers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRefers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRefers();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลบันทึกการส่งต่อผู้ป่วยเกินศักยภาพ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="15%">
                  แพทย์
                </TableCell>
                <TableCell align="center" width="15%">
                  ผู้ป่วย
                </TableCell>
                <TableCell align="center" width="20%">
                  โรงพยาบาล
                </TableCell>
                <TableCell align="center" width="15%">
                  โรค
                </TableCell>
                <TableCell align="center" width="20%">
                  สาเหตุ
                </TableCell>
                <TableCell align="center" width="15%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refers.map((item: ReferInterface) => (
                <TableRow key={item.ReferID}>
                  <TableCell align="center">{item.Doctor.Name}</TableCell>
                  <TableCell align="center">{item.MedicalRecord.PatientName}</TableCell>
                  <TableCell align="center">{item.Hospital.Name}</TableCell>
                  <TableCell align="center">{item.Disease.Name}</TableCell>
                  <TableCell align="center">{item.Cause}</TableCell>
                  <TableCell align="center">{format((new Date(item.Date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Refers;

