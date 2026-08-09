module.exports = (current, next) => {
  const flow = {
    CREATED: ['APPROVED_BY_RECEIVER'],
    APPROVED_BY_RECEIVER: ['VERIFIED_AT_PARK'],
    VERIFIED_AT_PARK: ['RECEIVED_AT_PICKUP'],
    RECEIVED_AT_PICKUP: ['IN_TRANSIT'],
    IN_TRANSIT: ['DELIVERED']
  };

  return flow[current]?.includes(next);
};
