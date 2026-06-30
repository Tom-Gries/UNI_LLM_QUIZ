import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

function App() {
  const navigate = useNavigate();

  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("lastScore");

    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
          }}
        >
          Human or Robot?
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 650,
          }}
        >
          You will be shown a series of short self-descriptions one after another.
          For each text, decide whether it was written by a human or by an artificial intelligence.
        </Typography>

        {score !== null && (
          <Typography variant="h5" color="primary">
            You correctly classified <strong>{score}</strong> texts.
          </Typography>
        )}

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/game")}
          sx={{
            mt: 2,
            px: 6,
            py: 1.5,
            fontSize: "1.2rem",
          }}
        >
          Start
        </Button>
      </Box>
    </Container>
  );
}

export default App;