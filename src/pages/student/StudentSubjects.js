import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "1rem",
    color: "#333",
  },
  subtitle: {
    marginBottom: "0.5rem",
    color: "#555",
  },
  table: {
    marginTop: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  tableCell: {
    fontWeight: "bold",
    color: "#555",
  },
  navigation: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
  },
  subjectList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  },
  subjectItem: {
    textAlign: "center",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "400px",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector(
    (state) => state.user
  );

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  useEffect(() => {
    if (subjectMarks.length === 0) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectMarks, dispatch, currentUser.sclassName._id]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => (
    <Box sx={styles.table}>
      <Typography variant="h4" align="center" sx={styles.title}>
        Subject Marks
      </Typography>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sx={styles.tableCell}>Subject</StyledTableCell>
            <StyledTableCell sx={styles.tableCell}>Marks</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {subjectMarks.map((result, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{result.subName?.subName}</StyledTableCell>
              <StyledTableCell>{result.marksObtained}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  const renderChartSection = () => (
    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
  );

  const renderClassDetailsSection = () => (
    <Container sx={styles.container}>
      <Typography variant="h4" align="center" sx={styles.title}>
        Class Details
      </Typography>
      <Typography variant="h5" align="center" sx={styles.subtitle}>
        You are currently in Class {sclassDetails?.sclassName}
      </Typography>
      <Typography variant="h6" align="center" sx={styles.subtitle}>
        And these are the subjects:
      </Typography>
      <Box sx={styles.subjectList}>
        {subjectsList?.map((subject, index) => (
          <Box key={index} sx={styles.subjectItem}>
            <Typography variant="subtitle1">
              {subject.subName} ({subject.subCode})
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );

  return (
    <Container>
      {loading ? (
        <Box sx={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={4}>
          {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
            <>
              {selectedSection === "table" && renderTableSection()}
              {selectedSection === "chart" && renderChartSection()}

              <Paper sx={styles.navigation} elevation={3}>
                <BottomNavigation
                  value={selectedSection}
                  onChange={handleSectionChange}
                  showLabels
                >
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={
                      selectedSection === "table" ? (
                        <TableChartIcon />
                      ) : (
                        <TableChartOutlinedIcon />
                      )
                    }
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={
                      selectedSection === "chart" ? (
                        <InsertChartIcon />
                      ) : (
                        <InsertChartOutlinedIcon />
                      )
                    }
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            renderClassDetailsSection()
          )}
        </Box>
      )}
    </Container>
  );
};

export default StudentSubjects;
