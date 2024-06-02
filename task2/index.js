const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
};

exports.inviteUser = async function (req, res) {
  try {
    const invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";

    const invitationResponse = await superagent
      .post(authUrl)
      .send(invitationBody);

    if (!invitationResponse) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: true, message: "Failed to send invitation" });
    }

    if (invitationResponse.status === HttpStatus.CREATED) {
      const { authId, invitationId } = invitationResponse.body;

      // Update or create the user in the database
      const createdUser = await User.findOneAndUpdate(
        { authId },
        { authId, email: invitationBody.email },
        { upsert: true, new: true }
      );

      if (!createdUser) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: "Failed to create/update user" });
      }

      // Find the shop by ID
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: "No shop found" });
      }

      // Add invitation ID to the shop's invitations array
      if (!shop.invitations.includes(invitationId)) {
        shop.invitations.push(invitationId);
      }

      // Add the created user to the shop's users array
      if (!shop.users.includes(createdUser._id)) {
        shop.users.push(createdUser);
      }
      shop.save();

      // Send the invitation response back to the client
      res.json(invitationResponse);
    } else if (invitationResponse.status === HttpStatus.OK) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: true, message: "User already invited to this shop" });
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: true, message: "Failed to send invitation" });
    }
  } catch (error) {
    console.error("Error inviting user:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};

/*
Recommendation

* Callback Hell: I Modified the code to use async and await .  The use of nested callbacks can lead to callback hell, making the code difficult to read and maintain.

* Potential Exception: I added a check for the invitationResponse  before accessing its property ; Accessing properties like invitationResponse.status directly
 without checking if invitationResponse is null or undefined could lead to exceptions.

* Error Handling: While there's some error handling, it's minimal. I added more error handling handle various scenarios.

* Improved the code structure for  readability and maintainability.

* The use of enums for the HTTP status codes so that when status code is added or changed in the future, it only needs to be updated in one place

I used const instead of var for declaring constants like invitationBody, shopId, and authUrl  which means they are only accessible within 
the block they are defined in, providing better code clarity and preventing accidental reassignments or modifications.

*/
