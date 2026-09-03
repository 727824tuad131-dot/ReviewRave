import React from "react";

const DomainChart = ({
  title,
  data = []
}) => {
  return (
    <div className="chart-card">

      <h2>
        {title}
      </h2>

      <div className="domain-chart">

        {data.length === 0 ? (

          <div className="empty-chart">
            No data available
          </div>

        ) : (

          data.map((item, index) => (

            <div
              className="chart-row"
              key={index}
            >

              <div className="chart-label">
                <span>
                  {item.label}
                </span>

                <strong>
                  {item.value}%
                </strong>
              </div>

              <div className="bar-container">

                <div
                  className="bar"
                  style={{
                    width: `${Math.min(
                      Math.max(
                        Number(item.value) || 0,
                        0
                      ),
                      100
                    )}%`,
                    backgroundColor:
                      item.color ||
                      "currentColor"
                  }}
                />

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default DomainChart;