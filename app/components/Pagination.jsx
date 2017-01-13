import React, { PropTypes } from 'react';
import { List } from 'immutable';

const Pagination = ({
  current, total, numberToShow, onPageChange, disabled,
}) => {
  const actualNumberToShow = numberToShow < total ? numberToShow : total;
  const preCounts = Math.floor(actualNumberToShow / 2);
  const preNumber = new List(new Array(preCounts));
  const nextNumber = new List(new Array(actualNumberToShow - 1 - preCounts));

  const pre = preNumber.map((v, i) => current - (preNumber.size - i));
  const next = nextNumber.map((v, i) => current + i + 1);
  const numbers = pre.concat([current], next);
  const offsetMin = numbers.first() > 0 ? 0 : 1 - numbers.first();
  const offsetMax = numbers.last() <= total ? 0 : total - numbers.last();
  const offset = offsetMin + offsetMax;
  const onPre = onPageChange.bind(null, current - 1);
  const onNext = onPageChange.bind(null, current + 1);

  const preClass = current < 2 || disabled ? 'disabled' : '';
  const nextClass = current > total - 1 || disabled ? 'disabled' : '';
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${preClass}`}>
          <a className="page-link" href="javascrip:void(0)" onClick={onPre}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {
          numbers.map((number) => {
            const n = number + offset;
            const trigger = onPageChange.bind(null, n);
            const active = n === current ? 'active' : '';
            const disable = disabled && !active ? 'disabled' : '';
            return (
              <li
                key={n}
                className={`page-item ${active} ${disable}`}
              >
                <a
                  className="page-link"
                  href="javascrip:void(0)"
                  onClick={trigger}
                >
                  {n}
                </a>
              </li>
            );
          })
        }
        <li className={`page-item ${nextClass}`}>
          <a className="page-link" href="javascrip:void(0)" onClick={onNext}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  numberToShow: PropTypes.number,
  disabled: PropTypes.bool,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  current: 1,
  total: 10,
  numberToShow: 3,
  disabled: false,
  onPageChange: v => v,
};

export default Pagination;
