package models

import org.bson.types.ObjectId
import play.api.libs.json._

case class Supplier(
  _id: ObjectId,
  name: String,
  email: String
)

object Supplier {
  // Conversor implícito para ObjectId
  implicit val objectIdFormat: Format[ObjectId] = new Format[ObjectId] {
    def writes(objectId: ObjectId): JsValue = JsString(objectId.toHexString)
    def reads(json: JsValue): JsResult[ObjectId] = json match {
      case JsString(s) =>
        try JsSuccess(new ObjectId(s))
        catch {
          case _: IllegalArgumentException => JsError("Invalid ObjectId")
        }
      case _ => JsError("Expected JsString for ObjectId")
    }
  }

  // Este debe estar después del Format[ObjectId]
  implicit val format: OFormat[Supplier] = Json.format[Supplier]
}
