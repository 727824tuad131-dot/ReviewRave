
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsights } from '../../store/slices/insightSlice';
import EmptyState from '../common/EmptyState';

const InsightList = () => {
  const dispatch = useDispatch();
  const { insights, isLoading } = useSelector((state) => state.insights || {});

  useEffect(() => {
    dispatch(getInsights());
  }, [dispatch]);

  return (
    <div className="insight-list" data-testid="insight-list">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: '0 0 0.25rem 0' }}>Insights</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
          AI-driven customer feedback insights, sentiment trends, and executive summaries
        </p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          Loading insights...
        </div>
      ) : !insights ? (
        <EmptyState message="No insights available." />
      ) : (
        <div className="insights-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card insight-card">
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Sentiment Summary</h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {insights.summary || 'Customer sentiment is largely positive across product lines.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightList;