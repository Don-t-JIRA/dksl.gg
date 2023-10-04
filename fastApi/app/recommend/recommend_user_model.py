from sqlmodel import Field, SQLModel

class RecommendUserBase(SQLModel):
    id: int = Field(default=None, primary_key=True)
    champ_level: int = Field(default=None)
    solo_kills: int = Field(default=None)
    assists: int = Field(default=None)
    damage_per_minute: float = Field(default=None)
    damage_taken_percentage: float = Field(default=None)
    kda: float = Field(default=None)
    lane_minions: int = Field(default=None)
    total_damage: int = Field(default=None)
    vision_score: int = Field(default=None)
    control_ward: int = Field(default=None)


class MatchHistories(BaseIdModel, RecommendUserBase, table=True):
    __tablename__ = "RECOMMEND_LIST"