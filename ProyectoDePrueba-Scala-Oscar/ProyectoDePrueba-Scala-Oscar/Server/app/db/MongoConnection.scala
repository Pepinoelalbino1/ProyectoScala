package db

import com.typesafe.config.ConfigFactory
import org.mongodb.scala._

object MongoConnection {
  private val config = ConfigFactory.load()
  val client: MongoClient = MongoClient(config.getString("mongodb.uri"))
  val database: MongoDatabase = client.getDatabase(config.getString("mongodb.database"))
}
