const ParticipantController = {
  kudo: async (req, res) => {
    console.log(req.body)
    res.send({ error: false })
  }
}

export default ParticipantController