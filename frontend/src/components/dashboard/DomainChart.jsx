import React from "react";

const DomainChart = ({ title, data = [] }) => {
  const values = data
    .map((item) => Number(item.value) || 0);

  const maxValue =
    values.length > 0
      ? Math.max(...values, 1)
      : 1;

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <span className="card-eyebrow">
            SENTIMENT BREAKDOWN
          </span>

          <h2>{title}</h2>
        </div>

        <div className="chart-header-icon">
          ◔
        </div>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">
          <div className="chart-empty-icon">
            ◔
          </div>

          <p>No data available.</p>
        </div>
      ) : (
        <div className="horizontal-chart">
          {data.map((item, index) => {
            const numericValue =
              Number(item.value) || 0;

            const width =
              Math.max(
                0,
                Math.min(
                  100,
                  (numericValue / maxValue) * 100
                )
              );

            return (
              <div
                className="chart-row"
                key={`${item.label}-${index}`}
              >
                <div className="chart-row-header">
                  <span className="chart-label">
                    {item.label}
                  </span>

                  <span className="chart-value">
                    {item.value}
                  </span>
                </div>

                <div className="chart-track">
                  <div
                    className="chart-bar"
                    style={{
                      width: `${width}%`,
                      backgroundColor:
                        item.color,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DomainChart;