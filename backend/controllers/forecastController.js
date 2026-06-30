const forecast = require("../models/forecastModel");

exports.getForecast = async (req, res) => {

    try {

        const items = await forecast.getForecast();

        const predictions = items.map(item => {

            const totalIssued = Number(item.totalIssued) || 0;
            const totalDays = Number(item.totalDays) || 0;

            const avgDailyUsage =
                totalDays > 0
                    ? totalIssued / totalDays
                    : 0;

            const daysRemaining =
                avgDailyUsage > 0
                    ? (Number(item.current_stock) / avgDailyUsage).toFixed(1)
                    : "N/A";

            let status = "Healthy";

            if (daysRemaining !== "N/A") {

                if (daysRemaining <= 7)
                    status = "Critical";

                else if (daysRemaining <= 30)
                    status = "Restock Soon";

            }

            return {

                item_id: item.item_id,
                item_name: item.item_name,
                unit: item.unit,

                current_stock: Number(item.current_stock),

                average_daily_usage:
                    avgDailyUsage.toFixed(2),

                predicted_days_remaining:
                    daysRemaining,

                status

            };

        });

        res.status(200).json({

            success: true,
            count: predictions.length,
            data: predictions

        });

    } catch (err) {

        console.error("Forecast Error:", err.message);

        res.status(500).json({

            success: false,
            message: "Unable to generate forecast."

        });

    }

};