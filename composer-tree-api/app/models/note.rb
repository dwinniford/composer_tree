class Note < ApplicationRecord
    belongs_to :tree 
    validates :title, presence: true 
end
