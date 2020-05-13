import mongoose from 'mongoose'

import Kudo from '@models/Kudo'
import Participant from '@models/Participant'
import User from '@models/User'

const kudo = async (req, res) => {
  try {
    const kindAct = req.body.kindAct
    const participantId = req.body.participantId
    const userId = req.decoded.id

    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(userId)
    })
    
    const brooche = user.brooches.filter(brooche => brooche.name === kindAct).shift()
    const total = brooche.total - 1

    if (total >= 0) {
      await User.updateOne({
        _id: mongoose.Types.ObjectId(userId),
        'brooches.name': kindAct
      }, {
        $set : { 'brooches.$.total': total } 
      })

      const kudo = new Kudo({
        userId,
        participantId,
        kudo: kindAct
      })

      const kudoCreated = await kudo.save()

      console.log(kudoCreated)
      if (!kudoCreated)
        return res.status(400).send({ 
          error: true, 
          message: 'Couldn\'t save your kudo, please try again'
        })
  
      return res.send({
        error: false,
        data: [kudoCreated],
        message: 'Operation successfully completed'
      })
    } else {
      return res.status(400).send({ 
        error: true, 
        message: 'You don\'t have kudos to distribute'
      })
    }
  } catch (err) {
    return res.status(500).send({ 
      error: true,
      message: 'Internal server error'
    })
  }
}

const show = async (req, res) => {
  try {
    const data = await Participant.find()
    return res.send({ 
      error: false, 
      data,
      message: 'Operation successfully completed'
    })
  } catch (err) {
    return res.status(500).send({ error: true })
  }
}

export {
  kudo,
  show
}