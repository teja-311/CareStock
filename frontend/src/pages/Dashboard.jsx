import { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Typography
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState({
    totalItems: 0,
    lowStock: 0,
    nearExpiry: 0,
    receivedToday: 0,
    issuedToday: 0
  });

  useEffect(() => {

    loadSummary();

  }, []);

  const loadSummary = async () => {

    try {

      const res = await api.get("/dashboard/summary");

      setSummary(res.data.data);

    } catch (err) {

      console.error(err);

    }

  };

  const cards = [
    {
      title: "Total Items",
      value: summary.totalItems
    },
    {
      title: "Low Stock",
      value: summary.lowStock
    },
    {
      title: "Near Expiry",
      value: summary.nearExpiry
    },
    {
      title: "Received Today",
      value: summary.receivedToday
    },
    {
      title: "Issued Today",
      value: summary.issuedToday
    }
  ];

  return (

    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        {cards.map((card) => (

          <Grid
            item
            xs={12}
            md={4}
            key={card.title}
          >

            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center"
              }}
            >

              <Typography variant="h6">

                {card.title}

              </Typography>

              <Typography
                variant="h3"
                fontWeight="bold"
                mt={2}
              >

                {card.value}

              </Typography>

            </Paper>

          </Grid>

        ))}

      </Grid>

    </DashboardLayout>

  );

}

export default Dashboard;