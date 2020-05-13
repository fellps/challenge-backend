export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  } else {
    return res.status(400).json({ error: true, message: err.message })
  }
}