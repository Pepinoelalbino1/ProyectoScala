package models

import play.api.libs.json._

case class User(name: String, email: String)

object User {
  implicit val format: OFormat[User] = Json.format[User]
}
